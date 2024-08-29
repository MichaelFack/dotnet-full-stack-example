using Fack.Lambdas.RandomNumber;
using Fack.Libraries.LambdaClasses;

// Build the Lambda runtime client passing in the handler to call for each
// event and the JSON serializer to use for translating Lambda JSON documents
// to .NET types.
await LambdaEntrypoint.RunAsync(new GetRandomNumberHandler());