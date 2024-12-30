import { useRouter } from 'next/router';
import PostDetails from '../../components/PostDetails';
import AddComment from '../../components/AddComment';
import { Box } from '@mui/material';

const PostPage: React.FC = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Box sx={{ padding: 4 }}>
			<PostDetails />
			{id && <AddComment postId={Number(id)} />}
		</Box>
	);
};

export default PostPage;
