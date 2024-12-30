import { useDispatch as useReduxDispatch } from 'react-redux';
import type { AppDispatch } from './store/index';

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
