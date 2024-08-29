using Amazon.Lambda.Core;

namespace Fack.Libraries.LambdaClasses;

public interface ILambdaHandler<TOutput>
{
  public Func<ILambdaContext, TOutput> GetFunc();
}

public interface ILambdaHandler<TInput, TOutput>
{
  public Func<TInput, ILambdaContext, TOutput> GetFunc();
}