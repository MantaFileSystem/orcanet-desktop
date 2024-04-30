

export type PeerInfo = {
    Location:    string
	Latency :    string
	PeerID  :    string
	Connection : string
	OpenStreams: string 
	FlagUrl :    string 
}

export type ActivityInfo = {   
	Name         :string 
	Size         :string 
	Hash         :string 
	Status       :string 
	Peers        :number  
	lastEditTime :number
}

export interface ITransaction {
	id: string;
	amount: number;
	status: string;
	reason: string;
	date: Date;
	From: string;
	To: string;
  }