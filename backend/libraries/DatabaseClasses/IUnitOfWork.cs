namespace Fack.Libraries.DatabaseClasses;

public interface IUnitOfWork<TEntity> : IDisposable
  where TEntity : BaseEntity
{
  public TResult DoWork<TResult>(Func<IRepository<TEntity>, TResult> work);
}

public interface IUnitOfWork<TEntity1, TEntity2> : IDisposable
  where TEntity1 : BaseEntity
  where TEntity2 : BaseEntity
{
  public TResult DoWork<TResult>(Func<IRepository<TEntity1>, IRepository<TEntity2>, TResult> work);
}

public interface IUnitOfWork<TEntity1, TEntity2, TEntity3> : IDisposable
  where TEntity1 : BaseEntity
  where TEntity2 : BaseEntity
  where TEntity3 : BaseEntity
{
  public TResult DoWork<TResult>(Func<IRepository<TEntity1>, IRepository<TEntity2>, IRepository<TEntity3>, TResult> work);
}