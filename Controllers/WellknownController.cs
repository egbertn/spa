using System;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace Minyada.Controllers
{
	[ApiController]
	public class WellknownController : ControllerBase
	{
		[HttpGet(".well-known/pki-validation/{id}")]

		public async Task<IActionResult> SSLCheck(string id)
		{
			if (string.IsNullOrEmpty(id))
			{
				return BadRequest();
			}
			if (!System.IO.File.Exists($"Files/{id}"))
			{
				return NotFound();
			}
			var allData = await System.IO.File.ReadAllTextAsync($"Files/{id}");
			return Content(allData, "text/plain");
		}
	}
}
