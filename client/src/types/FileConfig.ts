import { DocumentIcon, FolderIcon } from '@heroicons/react/solid';
import { ReactNode } from 'react';

export interface IFileConfig {
	svg: ReactNode;
	png: ReactNode;
	jpg: ReactNode;
	docx: ReactNode;
	txt: ReactNode;
	dir: ReactNode;
	defaultFile: ReactNode;
}
