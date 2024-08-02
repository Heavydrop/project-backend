import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { fileCaseDto } from './dto/fileCase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './entity/case.entity';
import { Repository } from 'typeorm';
import { IServe } from './dto/serve.dto';

@Injectable()
export class CaseService {

    constructor(
        @InjectRepository(Case)
        private caseRepository: Repository<Case>,
        private userService: UserService
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
            title: created.title,
            email: created.respondentEmail,
            phone: created.respondentPhone

        }
        const served = await this.serve(payload)
        
        return created
    }

    async makePayment(userId: string) {
        return true
    }

    async serve(payload: IServe) {
        return payload
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
}
