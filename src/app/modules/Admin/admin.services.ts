import QueryBuilder from '../../Builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdminIntoDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .pagination()
    .sort()
    .fields();

  const result = adminQuery.modelQuery;
  return result;
};

const getSingleIntoDB = async(id: string) =>{
    const result = await Admin.findById(id);
    return result
}

export const AdminService = {
  getAllAdminIntoDB,
  getSingleIntoDB
};
