import { Input } from "@/components/InputForm";
import { SelectForm } from "@/components/select";
import { TextArea } from "@/components/textArea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from 'react';
import userServices from "@/services/userServices";
import { cn } from "@/lib/utils";
import processService from "@/services/processService";

export interface ProcessFormValues {
    name: string;
    description: string;
    deadline: Date;
    leader: string;
    team: Array<Users>;
    tasks: Array<Tasks>;
}

interface Users {
    id: string;
    name: string;
    role: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface Tasks {
    title: string;
    priority: string;
    description: string;
}

export function CadastroProcessos() {
    const { register, handleSubmit, watch } = useForm<ProcessFormValues>();
    const [priority, setPriority] = useState('Baixa');
    const [titleTask, setTitleTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [users, setUsers] = useState<Users[]>([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [teamLeader, setTeamLeader] = useState('');
    const [team, setTeam] = useState<Users[]>([]);
    const [process, setProcesss] = useState<ProcessFormValues[]>([])

    useEffect(() => {
        getUsers();
    }, [])

    async function getUsers() {
        userServices.getUser()
            .then((response) => {
                setUsers(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    function handleChange(event: any) {
        const { value, checked } = event.target

        const parsedValue = JSON.parse(value);

        if (checked) {
            setTeam(pre => [...pre, parsedValue]);
        }
        else {
            setTeam(pre => { return [...pre.filter(skill => skill !== parsedValue)] });
        }
    }

    const createProcess: SubmitHandler<ProcessFormValues> = () => {
        const processo: ProcessFormValues = {
            name: title,
            description: description,
            deadline: deadline,
            tasks: tasks,
            team: team,
            leader: teamLeader,
        }
        processService.createProcess(processo)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
    }
    function addTask() {
        const tarefa: Tasks = {
            title: titleTask,
            priority: priority,
            description: descriptionTask
        }
        setTasks((prevState) => [...prevState, tarefa])
    }

    return (
        <main className="">
            <form
                className="grid grid-cols-2 gap-40 ml-12 content-evenly"
                onSubmit={handleSubmit(createProcess)}
            >
                <section className="">
                    <h1 className="text-3xl">Novo Processo</h1>
                    <div className="py-4">
                        <Card className="grid grid-cols-2 justify-items-center w-[37.5rem] p-[1.25rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                            <div className="mr-2">
                                <Input
                                    label="Nome do processo"
                                    id="name"
                                    type="text"
                                    setValue={setTitle}
                                />
                                <TextArea
                                    label="Descrição"
                                    id="description"
                                    setValue={setDescription}
                                />
                                <div className="center-normal py-2">
                                    <label>Atribuir uma equipe</label>
                                    <ScrollArea id="teamList" className="mt-2 p-4 h-[14.5rem] w-[16.875rem] rounded-md border">
                                        {users.map((user) => {
                                            if (user.id !== teamLeader)
                                                return (
                                                    // <section className="flex p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                                                    //     <label className="p-1" htmlFor="">
                                                    //         <input type="checkbox" value={user.id} onChange={handleChange} className="mr-2" />
                                                    //         {user.name}
                                                    //     </label>
                                                    // </section>
                                                    <label key={user.id} htmlFor={user.id} className="flex p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                                                        <input id={user.id} type="checkbox" value={JSON.stringify(user)} onChange={handleChange} className="mr-2" />
                                                        {user.name}
                                                    </label>
                                                )
                                        })}

                                    </ScrollArea>
                                </div>
                            </div>
                            <div className="ml-2">
                                <SelectForm
                                    label="Líder responsável do processo"
                                    id="lider"
                                    setValue={setTeamLeader}
                                    users={users}
                                />

                                <Input
                                    label="Tempo de duração"
                                    id="deadline"
                                    type="date"
                                    setValue={setDeadline} />

                                <div className="center-normal py-2">
                                    <label>Tarefas</label>
                                    <ScrollArea id="listTasks" className="mt-2 p-4 h-[17rem] w-[16.875rem] rounded-md border">
                                        {tasks.map((task, index) => (
                                            <section key={index} className="p-2 mt-1 mb-4 mx-1 border rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold p-1">{task.title}</span>
                                                    <span className={cn("pl-2 pb-1 text-blue-600", task.priority === "Alta" ? "text-red-600" : "text-orange-500")}>{task.priority}</span>
                                                </div>
                                                <span className="pl-2 text-[#777777]">{task.description}</span>
                                            </section>

                                        ))}
                                    </ScrollArea>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
                <section className="">
                    <div className="grid justify-items-center">
                        <Card className="grid justify-items-center w-[19rem] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
                            <div className="p-5">
                                <label>Prioridade</label>
                                <Tabs id="priorityTask" defaultValue="Baixa" className="mt-2">
                                    <TabsList className="grid w-[16.875rem] grid-cols-3">
                                        <TabsTrigger onClick={() => setPriority("Baixa")} value="Baixa">Baixa</TabsTrigger>
                                        <TabsTrigger onClick={() => setPriority("Média")} value="Média">Média</TabsTrigger>
                                        <TabsTrigger onClick={() => setPriority("Alta")} value="Alta">Alta</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <Input
                                label="Título"
                                id="titleTask"
                                type="text"
                                setValue={setTitleTask}
                            />
                            <TextArea
                                label="Descrição"
                                id="descriptionTask"
                                setValue={setDescriptionTask}
                            />
                            <div className="p-5">
                                <Button type="button"
                                    onClick={() => addTask()}
                                    className="w-29 h-10 rounded-xl text-sm text-black bg-white shadow-[0px_0px_9px_-2px_rgba(0,0,0,0.25)] hover:bg-[#C0C0C0] hover:duration-150 dark:bg-[#37373F] dark:text-white dark:hover:bg-[#C0C0C0] dark:hover:duration-150"
                                >Adicionar Tarefa</Button>
                            </div>
                        </Card>
                    </div>
                    <div className="ml-52 mt-20">
                        <Button type="submit"
                            className="w-40 h-11 rounded bg-[#53C4CD] text-white text-sm shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-sky-600">Criar Processo</Button>
                    </div>
                </section>
            </form>
        </main>

    )
}