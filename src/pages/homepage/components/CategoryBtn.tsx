import { Category } from "../../../models/Categories";
import "./CategoryBtn.css";
type CategoryBtnProps = {
  category: Category;
  setCategoryId: (categoryID: number) => void;
  active?: boolean;
};

export const CategoryBtn = ({ category, setCategoryId, active }: CategoryBtnProps) => (
  <button className={`category_btn ${active ? "selected" : ""}`} onClick={() => setCategoryId(category.id)} aria-pressed={active}>
    {category.name}
  </button>
);
