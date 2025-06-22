namespace FindME.Application.Dtos
{
    
    public record ItemDto(
        int ItemId,
        string Name,
        string Category,
        string Location,
        DateTime FoundDate,
        bool IsClaimed,
        string ImagePath,
        string Description
    );
}
