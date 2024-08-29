using Microsoft.EntityFrameworkCore;

namespace Fack.Libraries.DatabaseClasses.Tests;

public class TestDbContext() : DbContext
{
  protected override void OnConfiguring(DbContextOptionsBuilder options)
  {
    // connect to sqlite database
    options.UseInMemoryDatabase("TestDatabase");
  }

  DbSet<TestEntity> TestEntities { get; set; }
}