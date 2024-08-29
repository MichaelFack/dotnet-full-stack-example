using System.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Fack.Libraries.DatabaseClasses;

public abstract class BaseDatabaseContext(IConfiguration configuration) : DbContext
{
  private IConfiguration Configuration { get; } = configuration;

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    string connectionString = Configuration["connectionString"] ?? throw new ConfigurationErrorsException("Connection string is missing");

    optionsBuilder.UseMySQL(connectionString);
  }
}