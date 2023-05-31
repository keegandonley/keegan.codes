interface TrackBody {
  slug: string;
  inModal: boolean;
}

interface HiTrackBody {
  slug: string;
  qrScanned: boolean;
}

interface AggregateBody {
  slug: string;
  views: number;
}

interface CheersBody {
  slug: string;
  location: string;
  id: string;
}
