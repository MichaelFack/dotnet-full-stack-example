using Fack.Lambdas.RecordTime;
using Fack.Libraries.DatabaseClasses;
using Fack.Libraries.LambdaClasses;
using Microsoft.Extensions.Configuration;

// Build the Lambda runtime client passing in the handler to call for each
// event and the JSON serializer to use for translating Lambda JSON documents
// to .NET types.
using (var unitOfWork = new UnitOfWork<TimeStampEntity, DatabaseContext>(new DatabaseContext(new ConfigurationBuilder().Build())))
{
  await LambdaEntrypoint.RunAsync(new RecordTimeHandler(unitOfWork));
}