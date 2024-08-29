using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Fack.Libraries.DatabaseClasses;

namespace Fack.Lambdas.RecordTime;

internal class TimeStampEntity(TimeSpan Time) : BaseEntity
{
  internal TimeSpan Time { get; set; } = Time;
}

internal class DatabaseContext(IConfiguration configuration) : BaseDatabaseContext(configuration)
{
  DbSet<TimeStampEntity> TimeStamps { get; set; }
}