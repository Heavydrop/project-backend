import { Injectable, ConflictException, UnauthorizedException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from './enitity/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IServe } from 'src/case/dto/serve.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    // const { email, password } = signUpDto;

    const userExists = await this.userRepository.findOne({ where: { email: signUpDto.email } });
    if (userExists) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword: string = await bcrypt.hash(signUpDto.password, 10);

    const user = new User()
    user.fullName = signUpDto.fullName;
    user.email = signUpDto.email;
    user.password = hashedPassword;
    user.phoneNumber = signUpDto.phoneNumber;
    user.address = signUpDto.address;
    user.address = signUpDto.gender;
    user.age = signUpDto.age
    user.role = UserRole.USER

    const created = await this.userRepository.save(user);

    const payload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user: created };
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { id: user.id, email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async signInAdmin(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { id: user.id, email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    Object.assign(user, updateProfileDto);
    return await this.userRepository.save(user);
  }

  async getUser(id: string) {
    const data = await this.userRepository.findOne({where: { id }})
    return data
  }

  async changeRole(email: string, role: UserRole) {
    const user = await this.userRepository.findOne({ where: { email }});
    if (!user) {
      throw new HttpException('User not found', 404)
    }
    user.role = role
    return await this.userRepository.save(user)
  }

}
