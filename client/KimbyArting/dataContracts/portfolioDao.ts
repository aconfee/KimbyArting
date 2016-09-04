import { ProjectVm } from '../viewModels/projectVm';

class SubcategoryDao {
  cover: string;
  projects: ProjectVm[];
}

class CategoryDao {
  subCategories: SubcategoryDao[];
}

export class PortfolioDao {
  categories: CategoryDao[];
}
