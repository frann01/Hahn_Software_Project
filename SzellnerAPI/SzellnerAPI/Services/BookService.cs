using Google.Cloud.Firestore;
using SzellnerAPI.Models.Entities;

namespace SzellnerAPI.Services
{
    public class BookService
    {
        private readonly string? CollectionName = "books";
        private readonly FirestoreService firestore;

        public BookService()
        {
            firestore = new FirestoreService(CollectionName);
        }

        public Book Get(Book record) 
        {
            return firestore.GetBook(record);
        }

        public WriteResult Delete(Book record)
        {
            return firestore.DeleteBook(record);
        }

        public Array GetAll()
        {
            return firestore.GetAllBooks();
        }

        public Book Add(Book record)
        {
            return firestore.AddBook(record);
        }

        public Book Put(Book record)
        {
            return firestore.ModifyBook(record);
        }
    }
}
