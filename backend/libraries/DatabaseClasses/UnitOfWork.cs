using Microsoft.EntityFrameworkCore;

namespace Fack.Libraries.DatabaseClasses;

public class UnitOfWork<TEntity, TContext> : IUnitOfWork<TEntity>
  where TEntity : BaseEntity
  where TContext : DbContext
{
  TContext Context { get; }
  IRepository<TEntity> Repository { get; }

  public UnitOfWork(TContext context)
  {
    Context = context;
    Repository = new Repository<TEntity, TContext>(Context);
  }

  public void Dispose()
  {
    Context.Dispose();
    GC.SuppressFinalize(this);
  }

  public TResult DoWork<TResult>(Func<IRepository<TEntity>, TResult> work)
  {
    TResult result = work(Repository);
    Context.SaveChanges();
    return result;
  }
}