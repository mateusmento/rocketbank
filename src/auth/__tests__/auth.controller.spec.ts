import { SignIn } from "../signin.feature";
import { Test, TestingModule } from "@nestjs/testing";

describe("AuthController", () => {
	let sut: SignIn;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SignIn],
		}).compile();

		sut = module.get<SignIn>(SignIn);
	});

	it("should be defined", () => {
		expect(sut).toBeDefined();
	});
});
