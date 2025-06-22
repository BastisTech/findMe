namespace FindME.Application.Dtos;

public record ChangePasswordDto(string Username, string CurrentPassword, string NewPassword, string MasterPassword);
