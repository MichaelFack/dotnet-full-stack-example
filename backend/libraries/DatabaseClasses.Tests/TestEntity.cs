namespace Fack.Libraries.DatabaseClasses.Tests;

public class TestEntity(string TestAttribute) : BaseEntity
{
  public string TestAttribute { get; set; } = TestAttribute;
}