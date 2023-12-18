import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { CreateUserCommand } from '../../common/application/command/create-user.command';
import { FindUsersQuery } from '../../common/application/query/find-users.query';
import { FindUsersQueryString } from './dto/find-users.query.string';
import { FindUsersResponseDto } from './dto/find-users.response.dto';
import { FindUserByIdQuery } from '../../common/application/query/find-user-by-id.query';
import { FindUserByIdResponseDto } from './dto/find-user-by-id.response.dto';

@Controller('user')
export class UserController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Put()
  async createUser(@Body() body: CreateUserRequestDto): Promise<void> {
    const command = new CreateUserCommand(
      body.username,
      body.email,
      body.password,
      body.matchPassword,
    );
    await this.commandBus.execute(command);
  }

  @Get()
  async findUsers(
    @Query() queryString: FindUsersQueryString,
  ): Promise<FindUsersResponseDto> {
    const query = new FindUsersQuery(queryString);
    return await this.queryBus.execute(query);
  }

  @Get(':id')
  async findUserById(
    @Param('id') id: string,
  ): Promise<FindUserByIdResponseDto> {
    return await this.queryBus.execute(new FindUserByIdQuery(id));
  }
}
