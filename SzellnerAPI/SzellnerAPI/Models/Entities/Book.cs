using Google.Cloud.Firestore;

namespace SzellnerAPI.Models.Entities
{
    [FirestoreData]
    public class Book : FirebaseDoc
    {
        [FirestoreProperty]
        public string? key { get; set; }

        [FirestoreProperty]
        public string? title { get; set; }

        [FirestoreProperty]
        public string? author { get; set; }

        [FirestoreProperty]
        public int yearofpublication { get; set; }

        [FirestoreProperty]
        public int pages { get; set; }

        [FirestoreProperty]
        public string? genre { get; set; }

        [FirestoreProperty]
        public string? language { get; set; }

        [FirestoreProperty]
        public string? description { get; set; }

        [FirestoreProperty]
        public string? publishinghouse { get; set; }
    }
}