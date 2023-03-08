using Google.Cloud.Firestore;

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

        public WriteResult Delete(Book record)
        {
            return IDService.Delete(record);
        }

        public Array GetAll()
        {
            return IDService.GetAll();
        }

        public Book Add(Book record)
        {
            return IDService.Add(record);
        }
    }
}
