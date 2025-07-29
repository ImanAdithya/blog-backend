import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should throw UnauthorizedException when credentials are invalid', async () => {
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(
        controller.login({ username: 'wrong', password: 'wrong' })
      ).rejects.toThrow(UnauthorizedException);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith('wrong', 'wrong');
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it('should return login response when credentials are valid', async () => {
      const user = { id: 1, username: 'user1' };
      const loginResponse = {
        code: 200,
        message: 'Login successful',
        data: {
          userId: 1,
          username: 'user1',
          access_token: 'token',
        },
      };

      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue(loginResponse);

      const result = await controller.login({ username: 'user1', password: 'pass1' });

      expect(mockAuthService.validateUser).toHaveBeenCalledWith('user1', 'pass1');
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(loginResponse);
    });
  });

  describe('register', () => {
    it('should return registration success response', async () => {
      const dto = { username: 'newuser', password: 'newpass' };
      const registerResponse = {
        code: 201,
        message: 'User registered',
        data: { id: 1, username: 'newuser' },
      };

      mockAuthService.register.mockResolvedValue(registerResponse);

      const result = await controller.register(dto);

      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(registerResponse);
    });
  });
});
