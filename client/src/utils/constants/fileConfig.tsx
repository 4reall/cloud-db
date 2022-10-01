import { ReactComponent as Png } from 'assets/icons/png.svg';
import { ReactComponent as Svg } from 'assets/icons/svg.svg';
import { ReactComponent as Docx } from 'assets/icons/docx.svg';
import { ReactComponent as Txt } from 'assets/icons/txt.svg';
import { ReactComponent as Jpg } from 'assets/icons/jpg.svg';
import { ReactComponent as Dir } from 'assets/icons/Folder.svg';
import { DocumentIcon } from '@heroicons/react/outline';
import { IFileConfig } from 'types/FileConfig';

export const FileConfig: IFileConfig = {
	svg: <Svg className="h-full w-full" />,
	png: <Png className="h-full w-full" />,
	jpg: <Jpg className="h-full w-full" />,
	txt: <Txt className="h-full w-full" />,
	docx: <Docx className="h-full w-full" />,
	dir: <Dir className="h-full w-full" />,
	defaultFile: <DocumentIcon className="h-full w-full" />,
};
