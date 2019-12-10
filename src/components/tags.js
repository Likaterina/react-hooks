import React from 'react';

export function Tags(props) {
    return (
        <div>
            <form>
                <input
                    type='text'
                    className='search'
                    aria-autocomplete="list"
                    autoComplete="off"
                    tabIndex="0"
                    value={props.todoTag}
                    onChange={props.handleTagInput}
                    placeholder='tags'
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            props.addTag()
                        }
                    }}
                />
            </form>
            <span className="sizer"></span>
            <div className="default text" role="alert" aria-live="polite" aria-atomic="true">
                 </div>
            <div aria-multiselectable="true" role="listbox" >
                {props.tags.map((tag, index) =>
                    <div key={tag.key}>
                        {!tag.editingNow ? (
                            <div role="option"
                                aria-checked="false"
                                aria-selected="true"
                                style={{ pointerEvents: 'all' }}
                                className="selected item" >
                                <span className='text' onDoubleClick={() => props.editTag(index)}>{tag.text}</span>
                                <button onClick={() => props.deleteTag(index)} >x</button> </div>) : (
                                <div role="option"
                                    aria-checked="false"
                                    aria-selected="false"
                                    style={{ pointerEvents: 'all' }}
                                    className="item" >
                                    <form>
                                        <label className="edit-label" >
                                            <input className='edit' onChange={props.editingInputChangeTag(index)} value={tag.text} />
                                        </label>
                                        <input type='submit' className='finish-edit-button' onClick={() => props.finishEditingTag(index)} />
                                    </form>
                                    <button className='delete-button' onClick={() => props.deleteTag(index)}>x</button>
                                </div>
                            )}
                    </div>)
                }
            </div>
        </div>
    )
}
