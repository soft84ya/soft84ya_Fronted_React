import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl, token } from '../../common/http'
import { toast } from 'react-toastify';

const Create = ({ placeholder }) => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Content'
    }),
        [placeholder]
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const newData = { ...data, "content" : content}
        const res = await fetch(apiUrl + 'services', {
            'method': 'POST',
            'headers': {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token()}`
            },
            body: JSON.stringify(newData)
        });
        const result = await res.json();
        if (result.status == true) {
            toast.success(result.message);
            navigate('/admin/services');
        } else {
            toast.error(result.message);
        }
    }

    return (
        <>
            <Header />
            <main>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between">
                                        <h4 className="h5">Services / Create</h4>
                                        <Link to="/admin/services" className="btn btn-primary">Back</Link>
                                    </div>
                                    <hr />

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className={`form-control ${errors.title && 'is-invalid'}`}
                                                placeholder="Service name"
                                                {...register("title", { required: "Name is required" })}
                                            />
                                            {errors.title && <small className="text-danger">{errors.title.message}</small>}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="slug" className="form-label">Slug</label>
                                            <input
                                                type="text"
                                                id="slug"
                                                className={`form-control ${errors.slug && 'is-invalid'}`}
                                                placeholder="Slug"
                                                {...register("slug", { required: "Slug is required" })}
                                            />
                                            {errors.slug && <small className="text-danger">{errors.slug.message}</small>}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="shortDesc" className="form-label">Short Description</label>
                                            <textarea
                                                id="shortDesc"
                                                rows={3}
                                                className={`form-control ${errors.short_desc && 'is-invalid'}`}
                                                placeholder="Short description"
                                                {...register("short_desc", { required: "Short Description is required" })}
                                            />
                                            {errors.short_desc && <small className="text-danger">{errors.short_desc.message}</small>}

                                            {errors.short_description && <small className="text-danger">{errors.short_description.message}</small>}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="content" className="form-label">Content</label>
                                            <JoditEditor
                                                ref={editor}
                                                value={content}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={newContent => { }}
                                            />
                                            {errors.content && <small className="text-danger">{errors.content.message}</small>}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="status" className="form-label">Status</label>
                                            <select
                                                id="status"
                                                className={`form-control ${errors.status && 'is-invalid'}`}
                                                {...register("status", { required: "Status is required" })}
                                            >
                                                <option value="">-- Select Status --</option>
                                                <option value="1">Active</option>
                                                <option value="0">Block</option>
                                            </select>
                                            {errors.status && <small className="text-danger">{errors.status.message}</small>}
                                        </div>

                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Create
