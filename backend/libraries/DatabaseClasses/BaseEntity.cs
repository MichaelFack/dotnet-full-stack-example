using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fack.Libraries.DatabaseClasses;

public abstract class BaseEntity
{
  public int Id { get; internal set; }
  public TimeSpan CreatedAt { get; internal set; } = new TimeSpan();
  public TimeSpan UpdatedAt { get; protected set; } = new TimeSpan();
}