import { Controller, Post, Body, Patch, UseGuards, Get , Request, Req} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from 'src/config/get-user.decorator';
import { User } from './enitity/user.entity';
import { AuthGuard } from 'src/config/authenticated.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUser(@Request() req){
    return this.userService.getUser(req.user.id)
    // return req.user
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(signInDto);
  }

  @Patch('/complete-profile')
  @UseGuards(AuthGuard)
  updateProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @Request() req): Promise<User> {
    return this.userService.updateProfile(req.user.id, updateProfileDto);
  }
}
