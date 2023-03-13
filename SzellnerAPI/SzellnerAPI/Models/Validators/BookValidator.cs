namespace SzellnerAPI.Models.Validators
{
    using FluentValidation;
    using SzellnerAPI.Models.Entities;

    public class BookValidator : AbstractValidator<Book>
    {
        public BookValidator()
        {
            RuleFor(book => book.author).NotEmpty();
            RuleFor(book => book.pages).NotEmpty().GreaterThan(0);
            RuleFor(book => book.publishinghouse).NotEmpty();
            RuleFor(book => book.description).NotEmpty();
            RuleFor(book => book.title).NotEmpty();
            RuleFor(book => book.genre).NotEmpty();
            RuleFor(book => book.language).NotEmpty().MaximumLength(30);
            RuleFor(book => book.yearofpublication).NotEmpty().GreaterThan(0);
        }
    }
}
