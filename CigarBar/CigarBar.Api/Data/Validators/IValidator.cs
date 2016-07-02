using System.ComponentModel.DataAnnotations;

namespace UnsignedArmy.Web.Data.Validators
{
    public interface IValidator<T>
    {
        ValidationResult Validate(T entity);
    }
}
