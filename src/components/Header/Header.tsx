import { Column } from '../../shared/types';
import HeaderColumn from '../HeaderColumn/HeaderColumn';

type HeaderProps = {
    columns: Column[]
}

const Header = ({columns}: HeaderProps) => {
    return(
        <thead>
            <tr className='header-row'>
                {columns.map(col => <HeaderColumn key={col.name} name={col.name} title={col.title}  />)}
            </tr>
        </thead>
    );
};

export default Header;