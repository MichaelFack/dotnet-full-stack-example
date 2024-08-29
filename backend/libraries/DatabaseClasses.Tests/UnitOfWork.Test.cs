
namespace Fack.Libraries.DatabaseClasses.Tests;

public class TestDto(int Id, string TestAttribute)
{
  public int Id { get; } = Id;
  public string TestAttribute { get; } = TestAttribute;
}

public class UnitOfWorkUnitTest : IDisposable
{
  private readonly TestDbContext context;
  private readonly UnitOfWork<TestEntity, TestDbContext> subject;

  public UnitOfWorkUnitTest()
  {
    context = new();
    subject = new(context);
  }

  public void Dispose()
  {
    subject.Dispose();
    GC.SuppressFinalize(this);
  }

  [Theory, Trait("Category", "Integration")]
  [InlineData("test")]
  [InlineData("Something completely different.")]
  public void UnitOfWorkCanAddAnEntityAsync(string testAttribute)
  {
    // Act
    var result = subject.DoWork((testRepo) =>
    {
      var entity = new TestEntity(TestAttribute: testAttribute);
      testRepo.Add(entity);
      return new TestDto(Id: entity.Id, TestAttribute: entity.TestAttribute);
    });
    // Assert
    Assert.Equal(testAttribute, result.TestAttribute);
    Assert.NotEqual(0, result.Id);
  }

  [Theory, Trait("Category", "Integration")]
  [InlineData("test")]
  [InlineData("Something completely different.")]
  public void UnitOfWorkCanGetAPreviouslyAddedEntityAsync(string testAttribute)
  {
    // Arrange
    var id = subject.DoWork((testRepo) =>
    {
      var entity = new TestEntity(TestAttribute: testAttribute);
      testRepo.Add(entity);
      return entity.Id;
    });
    // Act
    var result = subject.DoWork((testRepo) =>
    {
      var entity = testRepo.Get(id);
      return new TestDto(Id: entity.Id, TestAttribute: entity.TestAttribute);
    });
    // Assert
    Assert.Equal(testAttribute, result.TestAttribute);
    Assert.Equal(id, result.Id);
  }
}