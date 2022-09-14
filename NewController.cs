using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi6Practice.Models;
using WebApi6Practice.ServiceLayer;

namespace WebApi6Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewController : ControllerBase
    {
        public readonly ICrudOperationSL _crudOperationSL;
        public NewController(ICrudOperationSL crudOperation)
        {
            _crudOperationSL = crudOperation;
        }

        [HttpGet]
        [Route("GetRecords")]
        public async Task<IActionResult> GetRecords()
        {
            ReadRecordResponse response = null;

            try
            {
                response = await _crudOperationSL.GetRecords();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("SalarywithPara")]
        public async Task<IActionResult> GetSalary(SalaryRequestData request)
        {
            SalaryRecordResponse response = new SalaryRecordResponse();

            try
            {
                response = await _crudOperationSL.GetSalary(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("SignUp")]
        public async Task<IActionResult> SignUp(SignupRequest request)
        {
            SignupResponse response = new SignupResponse();

            try
            {
                response = await _crudOperationSL.SignUp(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("SignIn")]
        public async Task<IActionResult> SignIn(SignInRequest request)
        {
            SignInResponse response = new SignInResponse();

            try
            {
                response = await _crudOperationSL.SignIn(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpGet("RecordByOne")]
        public async Task<IActionResult> RecordByOne([FromQuery]ReadRecordOneRequest request)
        {
            ReadAllRecordResponse response = new ReadAllRecordResponse();

            try
            {
                response = await _crudOperationSL.RecordByOne(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }


    }
}
