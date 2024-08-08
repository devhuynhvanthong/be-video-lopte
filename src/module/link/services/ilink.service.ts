import { Link } from "../entities/link.entity";

export interface ILinkService {
    findAll(): Promise<Link[]>;
    create(link: any): Promise<any>;
    update(id: number, link: any): Promise<any>;
    remove(id: number): Promise<any>;
    findLinhOriginalByKey(key: string): Promise<any>;
    fillter(query: any): Promise<any>;
    
   
}