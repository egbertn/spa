using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SPA.Service.Services;
using SPA.Service.Models;
using Microsoft.AspNetCore.Cors;

namespace Minyada.Controllers
{
    [EnableCors]
    [ApiController]

    public class BlogsController : ControllerBase
    {

        private readonly ILogger<BlogsController> _logger;
        private readonly BlogService _blogService;

        public BlogsController(
            BlogService blogService,

            ILogger<BlogsController> logger)
        {
            _logger = logger;

            _blogService = blogService;
        }
         [HttpGet("procedure/{id}.json")]
        public async Task<IActionResult> Procedures (int id)
        {
            var data = await _blogService.Procedure(id);
            return Ok(data);
        }
        [HttpGet("testimonials.json")]
        public async Task<IActionResult> Testimonials()
        {
            var data = await _blogService.Testimonials();
            return Ok(data);

        }
        [HttpGet("procedures.json")]
        public async Task<IActionResult> Procedures ()
        {
            var data = await _blogService.Procedures();
            return Ok(data);
        }

        [HttpGet("posts.json")]
        public async Task<IActionResult> Get(int page = 1)
        {
            var data = await _blogService.Posts(page);
            return Ok(data);
        }
        [HttpGet("post/{id}.json")]
        public async Task<IActionResult> Post(int id = 1)
        {
            var data = await _blogService.Post(id);
            return Ok(data);
        }
        [HttpGet("contact.json")]
        public IActionResult Contact()
        {
            return Ok(new Contact());
        }
        [HttpGet("comments{postid}.json")]
        public async Task<IActionResult> Comments (int postId)
        {
            _logger.LogInformation("getting comments for post {0}", postId);
            var data = await _blogService.Comments(postId);
            return Ok(data);
        }
        [HttpGet("appointment.json")]
        public IActionResult Appointment()
		{
            return Ok(new Appointment());
		}
        [HttpPost("appointment.json")]
        public async Task<IActionResult> Appointment([FromBody] Appointment appointment, [FromServices] MailService _mailService)
		{
            if (!ModelState.IsValid)
			{
                return BadRequest(appointment);
			}
            var body = $"Beste Minyada, graag wil ik de volgende reservering maken \r\n " +
               $" naam: {appointment.Name} \r\nemail: {appointment.Email}\r\nService: {appointment.Service}\r\n" +
               $"tijd: {appointment.Date}\r\nOpmerkingen: {appointment.Remarks}\r\nTelefoon: {appointment.Phone}";
            await _mailService.SendMail(appointment.Email,$"Appointment afspraak voor {appointment.Date}", body);
            return NoContent();
		}

        [HttpPost("contact.json")]
        public async Task<IActionResult> Contact([FromBody]Contact contact, [FromServices] MailService _mailService)
        {
            if (!ModelState.IsValid || contact == null)
            {
                return BadRequest(ModelState);
            }

            if (!contact.IsValid)
            {
                 _logger.LogError("validation incorrect for Contact   {0}/{1}", contact.Lf, contact.h);
                return BadRequest();
            }
            await _mailService.SendMail(contact.Email, contact.Subject, contact.Body);
            return NoContent();

        }

    }
}
