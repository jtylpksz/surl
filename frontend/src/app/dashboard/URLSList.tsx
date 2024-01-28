import { Card, CardDescription, CardTitle } from '@/components/ui/card';

interface URLSListProps {
  id: number;
  url: string;
  expiration_date: string;
  user_id: '3e0e006b95db';
  username: string;
  password: string;
}

export const URLSList = ({ urls }: { urls: URLSListProps[] }) => {
  return urls.map((url: URLSListProps) => (
    <Card>
      <CardTitle>{url.url}</CardTitle>
      <CardDescription>Expires on {url.expiration_date}</CardDescription>
    </Card>
  ));
};
