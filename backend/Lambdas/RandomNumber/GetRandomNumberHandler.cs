using Amazon.Lambda.Core;
using Fack.Libraries.LambdaClasses;

namespace Fack.Lambdas.RandomNumber;

public class GetRandomNumberHandler : ILambdaHandler<double>
{
  public Func<ILambdaContext, double> GetFunc()
  {
    var rand = new Random();
    return (context) => rand.NextDouble();
  }
}