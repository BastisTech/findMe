using FindME.Application.Dtos;
using FindME.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FindME.Application.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;

    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _userService.ValidateUser(dto.Username, dto.Password);
        if (user == null)
            return Unauthorized();

        return Ok(new
        {
            username = user.Username,
            role = user.Role
        });
    }
}
