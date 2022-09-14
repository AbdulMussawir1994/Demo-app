using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi6Practice.Models;
using WebApi6Practice.ServiceLayer;

namespace WebApi6Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudOperationController : ControllerBase
    {
        public readonly ICrudOperationSL _crudOperationSL;
        public CrudOperationController(ICrudOperationSL crudOperation)
        {
            _crudOperationSL = crudOperation;
        }

        [HttpPost]
        [Route(template: "CreateRecord")]
        public async Task<IActionResult> CreateRecord(CreateRecordRequest req)
        {
            CreateRecordResponse response = null;

            try
            {
                response = await _crudOperationSL.CreateRecord(req);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return Ok(response);
        }

        [HttpGet]
        [Route("ReadRecord")]
        public async Task<IActionResult> ReadRecord()
        {
            ReadRecordResponse response = null;

            try
            {
                response = await _crudOperationSL.ReadRecord();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateRecord")]
        public async Task<IActionResult> UpdateRecord(UpdateRecordRequest request)
        {
            UpdateRecordResponse response = null;

            try
            {
                response = await _crudOperationSL.UpdateRecord(request);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpDelete]
        [Route("DeleteRecord")]
        public async Task<IActionResult> DeleteRecord([FromQuery] DeleteRecordRequest request)
        {
            DeleteRecordResponse response = null;

            try
            {
                response = await _crudOperationSL.DeleteRecord(request);
            }
            catch (Exception ex)
            {
                response.Issuccess = false;
                response.Message = ex.Message;
            }

            return Ok(response);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> UpdateRecord2([FromQuery] _2parametersReuqest request, [FromBody] _2parametersData data)
        {
            _2parameterQuery response = null;

            if (request.UserId != data.UserId)
            {
                return BadRequest();
            }

            try
            {
                response = await _crudOperationSL.UpdateRecord2(request,data);
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
