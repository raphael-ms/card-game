import { Powerstats } from './powerstats.model';
import { Biography } from './biography.model';
import { Appearence } from './appearence.model';
import { Connections } from './connections.model';
import { Work } from './work.model';
import { Image } from './image.model';

export class Hero {
    response: string;
    id: string;
    name: string;
    powerstats: Powerstats;
    biography: Biography;
    appearence: Appearence;
    work: Work;
    connections: Connections;
    image: Image;
}