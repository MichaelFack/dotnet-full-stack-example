using Amazon.Lambda.RuntimeSupport;
using Amazon.Lambda.Serialization.SystemTextJson;
using Fack.Libraries.LambdaClasses;

namespace Fack.Libraries.LambdaClasses;

public static class LambdaEntrypoint
{
  public static async Task RunAsync<TInput, TOutput>(ILambdaHandler<TInput, TOutput> handler)
  {
    await LambdaBootstrapBuilder.Create(handler.GetFunc(), new DefaultLambdaJsonSerializer())
      .Build()
      .RunAsync();
  }

  public static async Task RunAsync<TOutput>(ILambdaHandler<TOutput> handler)
  {
    await LambdaBootstrapBuilder.Create(handler.GetFunc(), new DefaultLambdaJsonSerializer())
      .Build()
      .RunAsync();
  }
}