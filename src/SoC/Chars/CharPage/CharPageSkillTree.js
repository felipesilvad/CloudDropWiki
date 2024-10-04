import React, {useState, useEffect} from 'react';
import {Row,Col,Form,Modal} from 'react-bootstrap';
import SkillTreeLV from '../SkillTreeLV';
import SkillTreeNew from '../SkillTreeNew';
import SkillListItem from '../../Skills/SkillListItem';

function CharPageSkillTree({
  chars, blueEffects, charSkills, windowWidth,
  skill_tree,skill_tree_label1,skill_tree_label2
}) {

  const [skillRec, setSkillRec] = useState(false)
  const [activeSkill, setActiveSkill] = useState()
  const [skillTreeView, setSkillTreeView] = useState(false)
  const [reversedSkillTree, setReversedSkillTree] = useState([])

  // FOR MOBILE ONLY MODAL
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const handleOnClickSkill = (slug) => {
    if (windowWidth.current < 768) {
      setActiveSkill(slug)
      handleShowModal(true)
    } else {
      setActiveSkill(slug)
    }
  }

  useEffect(() => {
    if (skill_tree) {
      setActiveSkill(skill_tree[0].skill0)
      setReversedSkillTree(skill_tree.reverse())
    }
  }, [skill_tree])
  
  return (
    <>
    <div className='black-label-div mt-2'>
      <h5>
        SKILL TREE
      </h5>
      </div>

      <div className='d-flex justify-content-around flex-wrap m-1 bg-lighter'>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Show Skill Recomendations"
        onClick={() => setSkillRec(!skillRec)}
      />
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Show All Skills Effects"
        onClick={() => setSkillTreeView(!skillTreeView)}
      />
      </div>

      {skillRec&&(
      <div className='d-flex mb-2 rec-bg align-items-center'>
        <div className='bg-lighter mx-1 px-2'>
          <b className='rec-label-color bg-op'>▉</b><span className='rec-label' >Optional</span>
          <b className='rec-label-color bg-rec'>▉</b><span className='rec-label' >Recommended</span>
        </div>
      </div>
      )}

      {!skillTreeView?(
      <Row>
        <Col md={6}>
          {skill_tree_label1&&(
            <div className=''>
              <div className='d-flex w-100 text-center'>
                <div className='skilltree-label skilltree-label-left'>
                  {skill_tree_label1}
                </div>
                <div className='skilltree-label skilltree-label-right'>
                  {skill_tree_label2}
                </div>
              </div>
            </div>
          )}
          {reversedSkillTree&&(reversedSkillTree.map((lv, index) => (
              charSkills.length>0&&(
                <SkillTreeNew blueEffects={blueEffects} skillRec={skillRec} handleOnClickSkill={handleOnClickSkill} activeSkill={activeSkill}
                lv={lv} index={index} last={skill_tree&&(skill_tree.length)} charSkills={charSkills} />
              )
          )))}
          
          {/* MOBILE ONLY MODAL */}
          <Modal show={show}  onHide={handleCloseModal}>
            <Modal.Header className='skill-modal' closeButton>
              
            </Modal.Header>
            <div>
              {charSkills.length>0&&(
                charSkills.filter(x => x.slug===activeSkill).length>0&&(
                  <SkillListItem blueEffects={blueEffects} chars={chars} w100={true}
                  skill={charSkills.filter(x => x.slug===activeSkill)[0]} />
                )
              )}
            </div>
          </Modal>
        </Col>
        <Col md={6} className='d-none d-md-block d-lg-block'>
          {charSkills.length>0&&activeSkill&&(
            charSkills.filter(x => x.slug===activeSkill).length>0&&(
              <SkillListItem blueEffects={blueEffects} chars={chars} w100={true}
              skill={charSkills.filter(x => x.slug===activeSkill)[0]} />
            )
          )}
        </Col>
      </Row>
      ):(
      <>  
        {skill_tree_label1&&(
          <div className='d-none d-md-block'>
            <div className='d-flex w-100 text-center'>
              <div className='skilltree-label skilltree-label-left'>
                {skill_tree_label1}
              </div>
              <div className='skilltree-label skilltree-label-right'>
                {skill_tree_label2}
              </div>
            </div>
          </div>
        )}
        {reversedSkillTree&&(reversedSkillTree.map((lv, index) => (
          charSkills.length>0&&(
            <SkillTreeLV blueEffects={blueEffects} skillRec={skillRec} lv={lv} chars={chars}
            index={index} last={skill_tree&&(skill_tree.length)} charSkills={charSkills} />
          )
        )))}
      </>
      )}
    </>
  );
}

export default CharPageSkillTree;