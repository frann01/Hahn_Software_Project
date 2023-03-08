namespace SzellnerAPI.Services
{
    public class BookService
    {
        private readonly string? CollectionName = "books";
        private readonly IDService IDService;

        public BookService()
        {
            IDService = new IDService(CollectionName);
        }

        public Book Get(Book record) 
        {
            return IDService.Get(record);
        }
    }
}
