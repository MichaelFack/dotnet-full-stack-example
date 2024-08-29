using Fack.Libraries.Tests;

namespace Fack.Lambdas.RandomNumber.Tests;

public class GetRandomNumberHandlerUnitTest
{
  private readonly GetRandomNumberHandler subject;

  public GetRandomNumberHandlerUnitTest()
  {
    subject = new GetRandomNumberHandler();
  }

  [Fact, Trait("Category", "Unit")]
  public void HandlerFuncReturnsADouble()
  {
    var context = new DummyContext();
    // Act
    var result = subject.GetFunc().Invoke(context);
    // Assert
    Assert.IsType<double>(result);
  }
}