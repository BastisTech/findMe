namespace FindME.Application.Dtos;

public record CreateItemDto(
    string Name,
    string CategoryName,
    string LocationName,
    DateTime FoundDate,
    string ImagePath,
    string Description
);

