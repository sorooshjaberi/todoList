import useShowGroups from "../../hooks/todos/useShowGroups";

type Props = {};
const SideBar = (props: Props) => {
  useShowGroups();
  return <div>SideBar</div>;
};
export default SideBar;
