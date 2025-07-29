import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';

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
    it('should return 401 code when invalid credentials', async () => {
      mockAuthService.validateUser.mockResolvedValue(null);

      const result = await controller.login({ username: 'wrong', password: 'wrong' });
      expect(result).toEqual({ code: 401, message: 'Invalid credentials', data: null });
      expect(mockAuthService.validateUser).toHaveBeenCalledWith('wrong', 'wrong');
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it('should call login and return token when credentials are valid', async () => {
      const user = { id: 1, username: 'user1' };
      const loginResponse = {
        code: 200,
        message: 'Login successful',
        data: { access_token: 'token' },
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
    it('should call register and return success message', async () => {
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
