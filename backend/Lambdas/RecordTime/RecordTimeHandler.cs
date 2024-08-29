using Amazon.Lambda.Core;
using Fack.Libraries.LambdaClasses;
using Fack.Libraries.DatabaseClasses;

namespace Fack.Lambdas.RecordTime;

internal class RecordTimeHandler(IUnitOfWork<TimeStampEntity> unitOfWork) : ILambdaHandler<bool>
{
  public Func<ILambdaContext, bool> GetFunc()
  {
    var now = new TimeSpan();

    return (context) => unitOfWork.DoWork((repository) =>
    {
      repository.Add(new TimeStampEntity(Time: now));

      return true;
    });
  }
}