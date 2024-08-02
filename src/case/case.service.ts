import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { fileCaseDto } from './dto/fileCase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './entity/case.entity';
import { Repository } from 'typeorm';
import { IServe } from './dto/serve.dto';
import { JwtService } from '@nestjs/jwt';
import { Serve } from './entity/serve.entity';
import { SignUpDto } from 'src/user/dto/sign-up.dto';
import { AcceptServeDto } from './dto/acceptServe.dto';
import { MailService } from 'src/mailer/mailer.service';

@Injectable()
export class CaseService {

    constructor(
        @InjectRepository(Case)
        private caseRepository: Repository<Case>,
        @InjectRepository(Serve)
        private serveRepository: Repository<Serve>,
        private userService: UserService,
        private mailService: MailService
    ) {}
    async fileCase(caseDto: fileCaseDto, userId: string) {
        const plaintiff = await this.userService.getUser(userId)
        const paid = await this.makePayment(userId)

        if(!paid) {
            throw new HttpException('Payment unsuccessful', 500)
        }

        const created = await this.caseRepository.create({ ...caseDto, paid: true, plaintiff})
        const payload: IServe = {
            caseId: created.id,
            plaintiff: plaintiff.fullName,
            fullName: caseDto.respondentName,
            title: caseDto.title,
            email: caseDto.respondentEmail,
            phone: caseDto.respondentPhone

        }
        const served = await this.serve(payload)
        
        return created
    }

    async makePayment(userId: string) {
        return true
    }

    async serve(payload: IServe) {
        const served = await this.serveRepository.create({ ...payload })
        return payload
    }

    async acceptServe(acceptServe: AcceptServeDto, serveId: string) {
        const serve =  await this.serveRepository.findOne({ where: { id: serveId }})
        if (!serve) {
            throw new HttpException('Serve not found', 404)
        }

        const report = await this.caseRepository.findOne({where: { id: serve.caseId}})

        const payload: SignUpDto = {
            fullName: serve.fullname,
            email: serve.email,
            password: acceptServe.password,
            phoneNumber: serve.phone,
            address: acceptServe.address,
            gender: acceptServe.gender,
            age: acceptServe.age
        }

        const accessToken = await this.userService.signUp(payload)
        report.respondent = accessToken.user
        await this.caseRepository.save(report)
        return {
            accessToken: accessToken.accessToken,
            caseId: report.id
        }
    }

    async litigatorApproval(id: string) {
        const filedCase = await this.findOne(id);
        if (!filedCase) {
            throw new HttpException('Case not found', 404)
        }

        filedCase.isApproved = true;
        const approved = await this.caseRepository.save(filedCase)

        return approved
    }

    async getAll() {
        return await this.caseRepository.find()
    }
    async findOne(id: string) {
        return await this.caseRepository.findOne({ where: { id }});
    }

    async setHearing(hearingDate: Date, caseId: string) {
        const caseToUpdate = await this.caseRepository.findOne({where: { id: caseId}});
        caseToUpdate.hearing = hearingDate
        const updatedCase = await this.caseRepository.save(caseToUpdate)

        await this.mailService.sendHearingNotification(caseToUpdate.respondentEmail, caseId, hearingDate.toISOString(), 'Respondent');
        await this.mailService.sendHearingNotification(caseToUpdate.plaintiff.email, caseId, hearingDate.toISOString(), 'Plaintiff');

        return updatedCase
    }
    async getApprovedCase() {
        return await this.caseRepository.find({where: { isApproved: true }})
    }
}
